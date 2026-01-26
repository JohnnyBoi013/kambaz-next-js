import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/2000" className="wd-dashboard-course-link">
            <Image
              src="/images/nodejs.jpg"
              width={200}
              height={150}
              alt="nodejs"
            />
            <div>
              <h5> CS2000 Node JS </h5>
              <p className="wd-dashboard-course-title">
                Front-end software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/2500" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={200} height={150} alt="ood" />
            <div>
              <h5> CS2500 OOD </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/2750" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={200} height={150} alt="algo" />
            <div>
              <h5> CS2750 Algo </h5>
              <p className="wd-dashboard-course-title">
                Algorithms and Data Structures
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/3000" className="wd-dashboard-course-link">
            <Image
              src="/images/fundies.jpg"
              width={200}
              height={150}
              alt="fundies"
            />
            <div>
              <h5> CS3000 Fundies </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 1
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/3250" className="wd-dashboard-course-link">
            <Image
              src="/images/fundies2.jpg"
              width={200}
              height={150}
              alt="fundies2"
            />
            <div>
              <h5> CS3520 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 2
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="courses/4000" className="wd-dashboard-course-link">
            <Image
              src="/images/networking.jpg"
              width={200}
              height={150}
              alt="networking"
            />
            <div>
              <h5> CS4000 Networking </h5>
              <p className="wd-dashboard-course-title">Networking</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
