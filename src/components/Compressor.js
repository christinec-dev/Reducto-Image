import React from 'react';
import Resizer from 'react-image-file-resizer';

//Stateful Class Component which will switch between compressed/uncompressed
class Compressor extends React.Component {
    //default props must be declared
    constructor(props) {
      super(props);
      //binds the onChange events
      this.fileChangedHandler = this.fileChangedHandler.bind(this);
      this.handlePreview = this.handlePreview.bind(this)
      //initial state of image
      this.state = {
        newImage: "",
        file: null
      };
    }

    //will handle the compression of our uploaded image
    fileChangedHandler(event) {
        //initially no file will be uploaded so no cpompression yet
        var fileInput = false;
        //if the file is uploaded the state changes and the cmpression is started
        if (event.target.files[0]) {
          fileInput = true;
        }
        if (fileInput) {
          try {
            Resizer.imageFileResizer(
            //Path of the image file
            event.target.files[0],
            //New image max width (ratio is preserved)
            500,
            //New image max height (ratio is preserved)
            500,
            //compressFormat (JPG/PNG/WEBP)
            "JPG",
            //Compression Quality
            100,
            //Degree rotation of image
            0,
            //Callback function of URI. Returns URI of resized image's base64 format
            (uri) => {
            console.log(uri);
            this.setState({ newImage: uri });
            },
            //outputType can be either base64, blob or file.
            "base64",
            );
          } 
          //Error handler in case compression fails
          catch (err) {
            alert("Something went wrong, please try again later.")
            console.log(err);
          }
        }
      }    

    //set the preview of the original uncompressed image
    handlePreview (event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
        
    //enable the input field to handle two onChange functions at the same time
    twoCalls = e => {
        this.handlePreview(e)
        this.fileChangedHandler(e)
    }

    render() {
        return (
          <div className="Compressor container-fluid">
            <div className="row">
                <h1><i class="fab fa-quinscape"></i>Reducto Image</h1>
                <p className="intro-text"> 
                Reduce the size of your images online
                <div className="bracket"></div>
               </p>
            </div>   
        
            <div className="row compressor-intro">
                {/*Where we upload the actual file*/}
                <div className="icon"></div>    
                <span className="input-group-btn">
                    <span className="btn btn-secondary btn-file">
                        <span className="upload-label"><i class="fas fa-file-upload"></i> Choose File</span>
                        <input type="file" onChange={this.twoCalls} className="filetype"/>
                    </span>    
                    <p className="upload-description">or drop your image here!</p>    
                </span>
            </div>

            <div className="row compression-results ">
                {/*Original File*/}
                <div className="col-lg-6 col-12 output">
                    <h3>Original Image:</h3>        
                    <img src={this.state.file} alt="" className="original"/>
                </div>
                {/*Compressed File*/}
                <div className="col-lg-6 col-12 output">
                    <h3>Compressed Image:</h3>
                    <img src={this.state.newImage} alt="" className="new"/>
                </div>
            </div>

            <div className="row">
                {/*Download button*/}
                <button className="download-btn">
                    <a href={this.state.newImage} download="download" className="btn btn-primary"><i class="fas fa-download"></i>Download Image</a>
                </button>
            </div>

          </div>
        );
      }
    }
    
    export default Compressor;