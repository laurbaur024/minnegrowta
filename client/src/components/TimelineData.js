import faker from "faker";
import randomColor from "randomcolor";
import moment from "moment";



export default function (groupCount, itemCount, daysInPast) {


  let groups = [
    {
      id: 1,
      title: "group 1",
      rightTitle: "title in the right sidebar",
      stackItems: true,
      height: 30
    },
    {
      id: 2,
      title: "group 2",
      rightTitle: "title in the right sidebar",
      stackItems: true,
      height: 30
    },
  ];
  // for (let i = 0; i < groupCount; i++) {
  //   groups.push({
  //     id: `${i + 1}`,
  //     title: faker.name.firstName(),
  //     rightTitle: faker.name.lastName(),
  //     bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
  //   })

  let items = [
    {
      id: 1,
      group: 1,
      title: "Random title",
      start_time: 1,
      end_time: 2,
      canMove: true,
      canResize: false,
      canChangeGroup: false
      // itemProps: {
      //   // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      //   'data-custom-attribute': 'Random content',
      //   'aria-hidden': true,
      //   onDoubleClick: () => { console.log('You clicked double!') },
      //   className: 'weekend',
      //   style: {
      //     background: 'fuchsia'
      //   }}
    }
  ];

  // items.push({
  //   id: i + '',
  //   group: faker.random.number({ min: 1, max: groups.length }) + '',
  //   title: faker.hacker.phrase(),
  //   start: startValue,
  //   end: endValue,
  //   // canMove: startValue > new Date().getTime(),
  //   // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
  //   className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
  //   itemProps: {
  //     'data-tip': faker.hacker.phrase()
  //   }
  // })

  items = items.sort((a, b) => b - a);

  return { groups, items };
}
