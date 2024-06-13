import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function DownloadBtn() {
  const [progress, setProgress] = useState(0);
  const btnRef = useRef();
  const progressRef = useRef();
  const isDownloading = progress > 0 && progress < 100;
  const isCompleted = progress >= 100;
  const isNotWorking = !isCompleted && !isDownloading;

  function addRemoveClass(el, add, remove) {
    if (add) el.classList.add(add);
    if (remove) el.classList.remove(remove);
  }

  // INCREASING PROGRESS STATE, ADDING BTN_CLICKED CLASS AND REMOVING IT AFTER 2 SECOND
  function handleClick() {
    // const intervalId = setInterval(() => {
    //   setProgress((prev) => {
    //     if (prev >= 100) {
    //       clearInterval(intervalId);
    //       return prev;
    //     }
    //     return prev + 45;
    //   });
    // }, 1000);
    addRemoveClass(btnRef.current, "btn_clicked", "btn_hover");
    setProgress(50);
    setTimeout(() => {
      addRemoveClass(btnRef.current, null, "btn_clicked");
      setProgress(100);
    }, 2000);
  }

  // SETTING PROGRESS INDICATOR WIDTH BASED ON ACTUAL PROGRESS
  // useEffect(() => {
  //   if (progressRef.current) {
  //     progressRef.current.style.width = `${progress}%`;
  //   }
  // }, [progress]);

useEffect(() => {
  if (!isDownloading && isCompleted) {
    btnRef.current.style.cssText = `
      width: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    `;
    // Set timeout to reset button style and progress after 2 seconds
    setTimeout(() => {
      setProgress(0); // Reset progress
      addRemoveClass(btnRef.current, null, "btn_clicked"); // Remove 'btn_clicked' class
      btnRef.current.removeAttribute("style"); // Reset button style
    }, 2000);
  }
}, [isDownloading, isCompleted]);

  // RETURNING JSX
  return (
    <button
      disabled={isDownloading || isCompleted}
      ref={btnRef}
      className="download_btn"
      onClick={isNotWorking ? handleClick : null}
      onMouseEnter={() => isNotWorking && addRemoveClass(btnRef.current, "btn_hover")}
      onMouseLeave={() => addRemoveClass(btnRef.current, null, "btn_hover")}
    >
      {/* INITIAL OR IF NOT WORKING */}
      {!isDownloading && !isCompleted ? <span>Download</span> : null}

      {/* IF DOWNLOADING */}
      {isDownloading && !isCompleted ? (
        <div className="progress_track relative h-1.5 w-full rounded-full bg-[#ffffff7c]">
          <div ref={progressRef} className="progress_bar absolute h-1.5 rounded"></div>
        </div>
      ) : null}

      {/* COMPLETION INDICATOR */}
      {!isDownloading && isCompleted ? <FaCircleCheck className="icon" /> : null}
    </button>
  );
}
  