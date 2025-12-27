import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const WorkIcon = () => <></>;

export default function Timelines() {
  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center mx-auto p-7 mt-32  lg:p-0 mb-20">
        <div className="images_title">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[3px] "
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="leading-[24px] text-2xl text-indigo-400">
            Introducing Blocks
          </h1>
        </div>

        <div>
          <h1 className=" text-5xl lg:text-7xl mt-4 text-center font-bold">
            A new easy way to create.
          </h1>
        </div>
      </div>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work  h-[20em]"
          contentStyle={{ background: "#455ce9", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #455ce9" }}
          date="2011 - present"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-  mb-2 text-5xl">
            Creative Director
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project
            Management, Team Leading
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work  h-[20em]  "
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="2010 - 2011"
          iconStyle={{
            color: "#fff",
            borderRadius: "12px",
          }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Art Director
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            San Francisco, CA
          </h4>
          <p>
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work  h-[20em]"
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="2008 - 2010"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Web Designer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Los Angeles, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work  h-[20em]"
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="2006 - 2008"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Web Designer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            San Francisco, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education  h-[20em]"
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="April 2013"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Content Marketing for Web, Mobile and Social Media
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
          <p>Strategy, Social Media</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education  h-[20em]"
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="November 2012"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Agile Development Scrum Master
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Certification</h4>
          <p>Creative Direction, User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education  h-[20em]"
          contentStyle={{ background: "#11182780", color: "#fff" }}
          date="2002 - 2006"
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element- text-2xl mb-2">
            Bachelor of Science in Interactive Digital Media Visual Imaging
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Bachelor Degree
          </h4>
          <p>Creative Direction, Visual Design</p>
        </VerticalTimelineElement>
        {/* <VerticalTimelineElement
          iconStyle={{ color: "#fff", borderRadius: "12px" }}
          icon={<WorkIcon />}
        /> */}
      </VerticalTimeline>
    </div>
  );
}
