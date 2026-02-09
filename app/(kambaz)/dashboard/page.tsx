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

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      image: "/images/reactjs.jpg",
    },
    {
      id: "2000",
      title: "CS2000 Node JS",
      description: "Front-end software developer",
      image: "/images/nodejs.jpg",
    },
    {
      id: "2500",
      title: "CS2500 OOD",
      description: "Object Oriented Design",
      image: "/images/ood.jpg",
    },
    {
      id: "2750",
      title: "CS2750 Algo",
      description: "Algorithms and Data Structures",
      image: "/images/algo.jpg",
    },
    {
      id: "3000",
      title: "CS3000 Fundies",
      description: "Fundamentals of Computer Science 1",
      image: "/images/fundies.jpg",
    },
    {
      id: "3250",
      title: "CS3520 Fundies 2",
      description: "Fundamentals of Computer Science 2",
      image: "/images/fundies2.jpg",
    },
    {
      id: "4000",
      title: "CS4000 Networking",
      description: "Networking",
      image: "/images/networking.jpg",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="mb-5">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card className="h-100">
                <Link
                  href={`/courses/${course.id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                    alt={course.title}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
