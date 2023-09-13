
import React, { useState, useEffect } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline/lib";
import generateFakeData from "./TimelineData";
import { useUserContext } from "../ctx/UserContext";


const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

export default function App() {

  // const { currUser } = useUserContext();
  // const id = currUser?.data?._id;

  // const [ results, setResults] = useState([]);
  // const searchFavorites = async () => {
  //   const response = await fetch(`/api/user/myfavorites/${id}`);
  //   const data = await response.json();
  //   console.log(data)
  //   setResults(data);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   searchFavorites();    
  // }, [setResults]);

  // Use the useState hook to manage state
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [defaultTimeStart, setDefaultTimeStart] = useState(moment().startOf("day").toDate());
  const [defaultTimeEnd, setDefaultTimeEnd] = useState(moment().startOf("day").add(1, "day").toDate());

  // Use the useEffect hook for side-effects, similar to componentDidMount
  useEffect(() => {
    const { groups, items } = generateFakeData(150);
    setGroups(groups);
    setItems(items);
  }, []); // Empty dependency array means this useEffect runs once after initial render



  return (
    <Timeline
      groups={groups}
      items={items}
      keys={keys}
      sidebarContent={<div>Above The Left</div>}
      itemsSorted
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      showCursorLine
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
}
