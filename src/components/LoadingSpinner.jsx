import "../assets/css/LoadingSpinner.css";
function LoadingSpinner() {
  return (
    <div className="pt-[50%] flex flex-col items-center z-50">
      <div className="loading-spinner">
      </div>
      <div className="pt-5 text-[#737791]">
        กำลังโหลดข้อมูล ...
      </div>
    </div>
  );
}
export default LoadingSpinner;
