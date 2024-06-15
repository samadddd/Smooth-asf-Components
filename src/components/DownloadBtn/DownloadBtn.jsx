import { useEffect, useRef } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import styles from "./DownloadBtn.module.css";
import chulakian from './assets/chulakian.png';

export default function DownloadBtn({ progress, onClick }) {
  const {
    download_btn,
    btn_clicked,
    btn_hover,
    progress_track,
    progress_bar,
    icon,
    chulakian: chulakianStyle,
  } = styles;
  const btnRef = useRef();
  const progressRef = useRef();
  const isDownloading = progress > 0 && progress < 100;
  const isCompleted = progress >= 100;
  const isNotWorking = !isCompleted && !isDownloading;

  function addRemoveClass(el, add, remove) {
    if (add) el.classList.add(add);
    if (remove) el.classList.remove(remove);
  }

  // ADDING CLASS TO ANIMATE BUTTON WHEN CLICKED
  function handleClick() {
    addRemoveClass(btnRef.current, btn_clicked, btn_hover);
    setTimeout(() => {
      addRemoveClass(btnRef.current, null, btn_clicked);
    }, 2000);
  }

  progressRef.current && (progressRef.current.style.width = progress);

  // ANIMATING BUTTON ON COMPLETION
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
        addRemoveClass(btnRef.current, null, btn_clicked); // Remove 'btn_clicked' class
        btnRef.current.removeAttribute("style"); // Reset button style
      }, 2000);
    }
  }, [isDownloading, isCompleted, btn_clicked]);

  useEffect(() => {
    progressRef.current && (progressRef.current.style.width = `${progress}%`);
  }, [progress]);

  // RETURNING JSX
  return (
    <div className="flex items-center justify-center">
      <button
        disabled={isDownloading || isCompleted}
        ref={btnRef}
        className={`${download_btn} ${isNotWorking ? "" : btn_hover}`}
        onClick={
          isNotWorking
            ? () => {
                handleClick();
                onClick();
              }
            : null
        }
        onMouseEnter={() =>
          isNotWorking && addRemoveClass(btnRef.current, btn_hover)
        }
        onMouseLeave={() => addRemoveClass(btnRef.current, null, btn_hover)}
      >
        {/* INITIAL OR IF NOT WORKING */}
        {!isDownloading && !isCompleted ? <span>Download</span> : null}

        {/* IF DOWNLOADING */}
        {isDownloading && !isCompleted ? (
          <div className={`${progress_track} relative h-1.5 w-full rounded-full bg-[#ffffff7c]`}>
            <div
              ref={progressRef}
              className={`${progress_bar} absolute h-1.5 rounded`}
            ></div>
          </div>
        ) : null}

        {/* COMPLETION INDICATOR */}
        {!isDownloading && isCompleted ? (
          <FaCircleCheck className={icon} />
        ) : null}
      </button>
      {!isDownloading && isCompleted ? (
        <img
          src={chulakian}
          alt="chulakian"
          className={`absolute ${chulakianStyle}`}
        />
      ) : null}
    </div>
  );
}
