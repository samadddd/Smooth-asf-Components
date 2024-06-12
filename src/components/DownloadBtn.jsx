import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

function DownloadBtn({}) {
  const [progress, setProgress] = useState(0);
  const btnRef = useRef(null);
  // const isFinished = progress === 100;
  const [isFinished, setIsFinished] = useState(progress === 100);
  const [isDownloading, setIsDownloading] = useState(
    progress > 0 && progress < 100,
  );

  useEffect(() => {
    const btn = document.querySelector(".download_btn");
    const progressBar = document.querySelector(".progress_bar > div");

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (progress === 100) {
      downloadFinished();
      setTimeout(() => {
        btnRef.current.classList.remove("download_finished");
        console.log("removed");
        setIsFinished(false);
        setIsDownloading(false);
      }, 3000);
    }
  }, [progress]);

  function animateOnClick() {
    btnRef.current.classList.add("btn_clicked");
    const intervalId = setInterval(() => {
      setProgress((prev) => prev + 5);
    }, 200);

    if (progress === 100) {
      clearInterval(intervalId);
      setIsDownloading(false);
      setIsFinished(true);
    }
    setTimeout(() => {
      btnRef.current.classList.remove("btn_clicked");
    }, 300);
  }

  function animateOnMouseOver() {
    btnRef.current.classList.add("btn_hover");
  }

  function animateOnMouseOut() {
    btnRef.current.classList.remove("btn_hover");
  }

  function downloadFinished() {
    const buttonElement = btnRef.current;
    if (buttonElement) {
      buttonElement.classList.add("download_finished");
    }
  }

  return (
    <>
      <p>{progress}</p>
      <button
        className="download_btn"
        onClick={animateOnClick}
        onMouseEnter={animateOnMouseOver}
        onMouseLeave={animateOnMouseOut}
        ref={btnRef}
      >
        {!isDownloading && !isFinished && <span>Download</span>}
        {isDownloading && (
          <div className="progress_bar relative h-1.5 w-full rounded-full bg-[#ffffff7c]">
            <div className={`progress_bar_full absolute h-1.5 rounded`}></div>
          </div>
        )}
        {isFinished && <FaCircleCheck className={`${isFinished && "icon"}`} />}
      </button>
    </>
  );
}

export default DownloadBtn;
