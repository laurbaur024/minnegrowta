
import {useState} from 'react'
import { Uploader } from "uploader";
import { UploadButton} from 'react-uploader'


const uploader = Uploader({ apiKey: "free" });


const uploaderOptions = {
  multi: false,
  styles: {
    colors: {
      primary: "#377dff"
    }
  }
}


const MyUploadButton = ({setFiles}) =>
  <UploadButton uploader={uploader}
                options={uploaderOptions}
                onComplete={setFiles}>
    {({onClick}) =>
      <button onClick={onClick}>
        Upload a file...
      </button>
    }
  </UploadButton>



const MyUploadedFiles = ({files}) => files.map(file => {
  const filePath = file.filePath 
  const fileUrl  = uploader.url(filePath, "thumbnail")
  console.log(fileUrl)
  return (
    <p key={fileUrl}> Photo Added!
    </p>
  );
})


const Upload = () => {
  const [files, setFiles] = useState([])
  return (
    <>
      {files.length 
         ? <MyUploadedFiles files={files} /> 
         : <MyUploadButton setFiles={setFiles} />
      }
    </>
  );
}

export default Upload
