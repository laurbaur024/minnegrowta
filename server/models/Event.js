const {Schema, model, Types, ObjectId} = require('mongoose');

const EventSchema = new Schema (
//   {
//     "start_date": {
//         "year":			<string>, // all events must have a year. 
//         "month":		<string>, // other attributes are optional
//         "day": 			<string>, 
//         "hour": 		<string>,
//         "minute": 		<string>,
//         "second": 		<string>,
//         "millisecond": 	<string>,
//         "format": 		<string>,
//         "display_text": <string>
//     },
//     "end_date": {                   // optional
//         "year":			<string>,
//         "month":		<string>,
//         "day": 			<string>,
//         "hour": 		<string>,
//         "minute": 		<string>,
//         "second": 		<string>,
//         "millisecond": 	<string>,
//         "format": 		<string>,
//         "display_text": <string>
//     },
//     "location": {                   // optional
//         "icon":         <string>,   // icon url
//         "lat":          <float>,   
//         "lon":          <float>,
//         "line":         <boolean>,
//         "name":         <string>,
//         "zoom":         <int>
//     },
//     "media": {
//         "caption":      <string>,
//         "credit":       <string>,
//         "url":          <string>,
//         "thumbnail":    <string>
//     },
//     "text": {
//         "headline":     <string>,
//         "text":         <string>
//     },
//     "unique_id":         <string>    // optional
// };
  {
    start_date: {
      year: {
        type: String,
        required: true
      },
      month: {
        type: String,
        required: false
      },
    },
    end_date: {
      year: {
        type: String,
        required: true
      },
      month: {
        type: String,
        required: true
      },
    },
    location: {
      icon: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
    media: {
      icon: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
    text: {
      icon: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
    type: String,
        required: true
      },
    },
    media: {
      icon: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
    text: {
      icon: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  {
    
  }
)

const Event = model('Event', EventSchemaSchema)

module.exports = Event

const EventSchema = new Schema (
  //   {
  //     "start_date": {
  //         "year":			<string>, // all events must have a year. 
  //         "month":		<string>, // other attributes are optional
  //         "day": 			<string>, 
  //         "hour": 		<string>,
  //         "minute": 		<string>,
  //         "second": 		<string>,
  //         "millisecond": 	<string>,
  //         "format": 		<string>,
  //         "display_text": <string>
  //     },
  //     "end_date": {                   // optional
  //         "year":			<string>,
  //         "month":		<string>,
  //         "day": 			<string>,
  //         "hour": 		<string>,
  //         "minute": 		<string>,
  //         "second": 		<string>,
  //         "millisecond": 	<string>,
  //         "format": 		<string>,
  //         "display_text": <string>
  //     },
  //     "location": {                   // optional
  //         "icon":         <string>,   // icon url
  //         "lat":          <float>,   
  //         "lon":          <float>,
  //         "line":         <boolean>,
  //         "name":         <string>,
  //         "zoom":         <int>
  //     },
  //     "media": {
  //         "caption":      <string>,
  //         "credit":       <string>,
  //         "url":          <string>,
  //         "thumbnail":    <string>
  //     },
  //     "text": {
  //         "headline":     <string>,
  //         "text":         <string>
  //     },
  //     "unique_id":         <string>    // optional
  // };
    {
      start_date: {
        year: {
          type: String,
          required: true
        },
        month: {
          type: String,
          required: false
        },
      },
      end_date: {
        year: {
          type: String,
          required: true
        },
        month: {
          type: String,
          required: true
        },
      },
      location: {
        icon: {
          type: String,
          required: true
        },
        year: {
          type: String,
          required: true
        },
      },
      media: {
        icon: {
          type: String,
          required: true
        },
        year: {
          type: String,
          required: true
        },
      },
      text: {
        icon: {
          type: String,
          required: true
        },
        year: {
          type: String,
          required: true
        },
      },
      type: String,
          required: true
        },
      },
      media: {
        icon: {
          type: String,
          required: true
        },
        year: {
          type: String,
          required: true
        },
      },
      text: {
        icon: {
          type: String,
          required: true
        },
        year: {
          type: String,
          required: true
        },
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    },
    {
      
    }
  )
  
  const Event = model('Event', EventSchemaSchema)
  
  module.exports = Event