export default function Modules() {
  return (
    <div>
      {/* Modules page controls */}
      <div>
        <button>Collapse All</button> <button>View Progress</button>{" "}
        <select>
          <option>Publish All</option>
          <option>Publish All Modules</option>
          <option>Publish All Items</option>
        </select>{" "}
        <button>+ Module</button>
      </div>

      <br />

      <ul id="wd-modules">
        {/* Week 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2 - Creating User
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a React Application
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create and style HTML pages
                </li>
                <li className="wd-content-item">
                  Understand basic CSS selectors
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 3 - HTML Basics
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 4 - CSS Basics
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Formatting User Interfaces with HTML
                </li>
                <li className="wd-content-item">Styling with CSS</li>
                <li className="wd-content-item">Bootstrap Introduction</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Understand JavaScript fundamentals
                </li>
                <li className="wd-content-item">
                  Learn how JavaScript interacts with the DOM
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 5 - JavaScript Basics
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 6 - JavaScript and the DOM
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to JavaScript</li>
                <li className="wd-content-item">
                  JavaScript Variables and Functions
                </li>
                <li className="wd-content-item">DOM Manipulation</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
