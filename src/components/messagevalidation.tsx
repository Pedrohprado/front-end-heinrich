import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleCheck } from 'react-icons/fa6';

const MessageValidation = ({ isMenssage }: { isMenssage: string }) => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const [isProgress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHidden) {
      let timer: number;
      const endTime = 2000;
      const intervalTime = 10;

      const startTime = Date.now();

      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const currentProgress = (elapsedTime / endTime) * 100;
        setProgress(currentProgress);
        if (elapsedTime < endTime) {
          timer = setTimeout(updateProgress, intervalTime);
        } else {
          setHidden(false);
          navigate('/myregisters');
        }
      };

      updateProgress();

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isHidden, navigate]);

  if (!isHidden) return null;

  if (isHidden)
    return (
      <div className=' top-0 right-0 fixed z-30 w-full h-screen bg-[#20202095] flex items-center justify-center'>
        <div className=' relative w-4/5 h-20 bg-white flex flex-col items-center justify-center rounded gap-2 text-green-900'>
          <div className=' flex items-center gap-1'>
            <FaRegCircleCheck size={18} />
            <p className=' font-medium text-sm '>{isMenssage}</p>
          </div>

          <div
            style={{ width: `${isProgress}%` }}
            className=' h-[3px] absolute left-0 bottom-0 bg-green-600 rounded rounded-t-none px-1'
          ></div>
        </div>
      </div>
    );
};

export default MessageValidation;
