
import {Button} from "@chakra-ui/button"


export default function Uploader () {

  const addImageBtn = $('#addImgBtn');
  const uploader = Uploader({apiKey: "free"});

  let imageString

  addImageBtn.on('click', async (e) => {
    e.preventDefault()
  
    imageString = await uploader.open({ 
      multi: false,
      mimeTypes: ["image/*"],
      editor: {
        images: {
          crop: true,
          cropShape: "circ",
          cropRatio: 1 / 1 
        },
        styles: {
          colors: {
            primary: '#db7f67',
            active: '#db7f67',
            shade500: '#db7f67', 
          }
      }
      }
     }).then(files => {
      if (files.length === 0) {
        console.log('No files selected.')
      } else {
        console.log('Picture added!');
        const imageUrl = files.map(editedFile => editedFile.fileUrl);
        if (imageUrl) {
          addImageBtn.attr('style', 'background-color: var(--brand-light); color: black').text('Photo added!') 
        }
        return imageUrl
      }
    }).catch(err => {
      console.error(err);
    });
  })


  return (
    <div>
      <Button id='addImageBtn'>Add Picture!</Button>
    </div>
  )
}

