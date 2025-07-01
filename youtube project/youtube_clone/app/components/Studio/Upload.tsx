"use client";
import React, { useState } from 'react'
import { useRouter} from 'next/navigation'
import Modal from '../Modal';
import Stepper from './Stepper';
import RadioButtonGroup from '../RadioButtonGroup';

export default function Upload( {session} : {session: any}) {
    const steps = ['Video Details', 'Pivacy Level', 'Confirmation'];
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [validationNext , setValidationNext] = useState(true);
    const [status, setStatus] = useState<string | null>('Public');
    const [description, setDescription] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
          setVideo(file);
          setTitle(file.name);
          // Create a URL for the video file to preview it
          const videoUrl = URL.createObjectURL(file);
          setVideoPreview(videoUrl);
          setCurrentStep(currentStep + 1);
        } else {
          alert('Please upload a valid video file');
        }
    };

    const router = useRouter()
    
    const openModal = () => {
        router.push("?modal=true", { scroll: false }); // Prevents scrolling to top
      };
    
      const nextStep = () => {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        }

        if(currentStep == 3) {
          // console.log('Submit');
          handleFileUpload();
          router.push('/studio/uploads');

        }
      };
    
      const prevStep = () => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
      };
    
    interface TitleEvent extends React.ChangeEvent<HTMLTextAreaElement> {}

    const Title = (e: TitleEvent) => {
      if(e.target.value === '') {
        return setValidationNext(false);
      }
      setTitle(e.target.value);
      setValidationNext(true);
      // console.log(title)
    }

    const handleRadioChange = (value: string) => {
      setStatus(value);
    };
    const renderStepContent = () => {
        switch (currentStep) {
          case 1:
            return (
              <div >
                <div>
                  <label>title (required)</label>
                  <div className='w-full'>
                  <textarea  onChange={Title} defaultValue={title ? title: ''} className={validationNext === false ? 'border-red-600 p-2 border rounded-md':'p-2 border rounded-md'} rows={2} cols={30} name="title" id=""></textarea>
                  </div>
                  <label>	description</label>
                  <div className='w-full'>
                    <textarea onChange={(e) => setDescription(e.target.value)} className='p-2 border rounded-md' rows={5} cols={30} name="description" id=""></textarea>
                  </div>
                </div>
                
              </div>
            );
          case 2:
            return (
              <div className='w-full'>
                <RadioButtonGroup
                  name="options"
                  options={[{
                    type: 'Public',
                    description: 'Everyone can see the video.'
                  },
                {
                  type: 'Private',
                  description: 'Only you can see the video.'
                },
                {
                  type: 'Unlisted',
                  description: 'Anyone with the link can see the video.'
                }]}
                  onChange={handleRadioChange}
                  defaultSelected='Public'
                />
              </div>
            );
          case 3:
            return (
              <div>
                <h2 className="text-xl font-semibold">Step 3: Confirmation</h2>
                <p className="mt-4">Please review the information and confirm.</p>
              </div>
            );
          default:
            return (
                <div className='flex flex-col items-center space-y-4 bg-gray-100'>
                    <input
                    type="file"
                    id="file-input"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="video/*"
                />
                <label className='max-w-lg' htmlFor="file-input" style={{ cursor: 'pointer' }}>
                    <img  src="/image/uploadimage.jpg" alt="uploadimage" />
                </label>
                
                <label
                    htmlFor="file-input"
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl cursor-pointer hover:bg-gray-700 focus:outline-none transition duration-200 ease-in-out shadow-lg hover:shadow-xl"
                >
                    Upload File
                </label>
                </div>
            );
        }
      };
    
    const handleFileUpload = async () => {
        if (!video) {
          alert('Please upload a video file');
          return;
        }

        if (!title) {
          alert('Please enter a title');
          return;
        }

        if(!status) {
          alert('Please select a status');
          return;
        }

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('video', video);
        formData.append('user_id', session.user.user_id);
        formData.append('title', title);
        formData.append('status', status);
        formData.append('description', description? description : '');
        // Send the file to the server
        try {
          const response = await fetch('/api/video', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            alert('File uploaded successfully');
          } else {
            alert('Failed to upload file');
          }
        } catch (error) {
          console.error('Failed to upload file:', error);
        }
      }
    
  return (
    <div>
        <button onClick={openModal} className="bg-red-500 text-white px-4 py-2 rounded-md">Uploads</button>

        <Modal >
            <div className='text-2xl font-bold mb-2'>  
                Upload Video

            </div>
            <hr />
            
            {
              currentStep !== 0 && <Stepper steps={steps} currentStep={currentStep-1} />
            }
            <div >
                <div className='flex  bg-gray-100 gap-4 p-4'>
                  <div>
                  {renderStepContent()}
                  </div>

                  <div>
                    {/* Video Preview */}
                    {videoPreview && (
                        <div>
                        <h3>Video Preview:</h3>
                        <video width="400" controls>
                            <source src={videoPreview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </div>
                    )}
                  </div>
                </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 }
                className={currentStep === 0 ? "hidden" :'px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50'}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={ validationNext === false}
                className= {currentStep === 0 ? "hidden" :"px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-60"}
              >
                {currentStep === 3 ? "Submit" : "Next"}
              </button>
            </div>
            </div>
        </Modal>

    </div>
  )
}
