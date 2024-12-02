import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function ConfirmationModal({ onSubmit, isOpen, onClose, courseId, nextGuideId, handleNextGuide2 }: any) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let response = false;
  console.log('guide', nextGuideId)

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      response = await onSubmit();
      if (response) {
         console.log('heeyy')
      } else {
        setErrorMessage('Your code submission is missing something');
      }
    } catch (error) {
      setErrorMessage('An error occurred. ' + error);
    } finally {
      setLoading(false);
      if (response) {
         handleNextGuide2();
      }
      onClose();
    }
  };

  return (
   <Dialog.Root open={isOpen} onOpenChange={onClose}>
     <Dialog.Portal>
       <Dialog.Overlay className="fixed inset-0 bg-black/50" />
       <Dialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 h-[300px]">
         <Dialog.Title>
         Submit Code for Review

         </Dialog.Title>
         <Dialog.Description>
            Are you sure you want to submit your code for review? This will assess your code.
         </Dialog.Description>
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
         <div className="mt-4 flex justify-end gap-2">
           <Dialog.Close asChild>
             <button className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
           </Dialog.Close>
           <button
             className="bg-[#3e63dd] text-white px-4 py-2 rounded"
             onClick={handleSubmit}
             disabled={loading}
           >
             {loading ? 'Submitting...' : 'Submit'}
           </button>
         </div>
       </Dialog.Content>
     </Dialog.Portal>
   </Dialog.Root>
 );
 
}
