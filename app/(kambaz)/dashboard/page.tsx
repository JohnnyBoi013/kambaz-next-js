"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
} from "react-bootstrap";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses,
  ) as Course[];
  const enrollmentsState = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const enrollments = (
    enrollmentsState as unknown as {
      enrollments: { _id: string; user: string; course: string }[];
    }
  ).enrollments;

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "New Department",
    credits: 3,
    description: "New Description",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e) => e.user === currentUser?._id && e.course === courseId,
    );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {!isFaculty && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn"
          >
            {showAllCourses ? "My Enrollments" : "All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <textarea
            value={course.description}
            className="form-control mb-2"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Course Description"
          />
          <Button
            onClick={() => dispatch(addNewCourse(course))}
            className="me-2"
            id="wd-add-new-course-click"
          >
            Add
          </Button>
          <Button
            onClick={() => dispatch(updateCourse(course))}
            variant="warning"
            id="wd-update-course-click"
          >
            Update
          </Button>
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="mb-5">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {displayedCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <CardImg
                  src="/images/reactjs.jpg"
                  variant="top"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </CardText>

                  {isEnrolled(c._id) && (
                    <Link
                      href={`/courses/${c._id}/home`}
                      className="btn btn-primary me-2"
                    >
                      Go
                    </Link>
                  )}

                  {isFaculty && (
                    <>
                      <Button
                        variant="warning"
                        className="me-2"
                        id="wd-edit-course-click"
                        onClick={() => setCourse(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        id="wd-delete-course-click"
                        onClick={() => dispatch(deleteCourse(c._id))}
                      >
                        Delete
                      </Button>
                    </>
                  )}

                  {!isFaculty &&
                    (isEnrolled(c._id) ? (
                      <Button
                        variant="danger"
                        onClick={() =>
                          dispatch(
                            unenroll({
                              userId: currentUser!._id,
                              courseId: c._id,
                            }),
                          )
                        }
                        id="wd-unenroll-btn"
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() =>
                          dispatch(
                            enroll({
                              userId: currentUser!._id,
                              courseId: c._id,
                            }),
                          )
                        }
                        id="wd-enroll-btn"
                      >
                        Enroll
                      </Button>
                    ))}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
