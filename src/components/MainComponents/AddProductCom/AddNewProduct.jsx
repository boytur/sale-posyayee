import {BiBarcodeReader} from 'react-icons/bi'
//เซ็ตรูป Preview

import {useState} from 'react'
function AddNewProduct() {

    const [isPreviewImg , setIsPreviewImg] = useState('https://placehold.co/600x400/EEE/31343C')
    function setImagePreview (URL){
        setIsPreviewImg(URL)
    }
    
  return (
    <div className='w-full pl-3  flex bg-white h-full' >
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-2 mt-4">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  ชื่อสินค้าใหม่
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border
                  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white
                  focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder= "โค้ก 1.5 ml."
                />
              </div>
              <div className="w-2/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                  htmlFor="grid-last-name"
                >
                  ราคา (บาท)
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border
                  border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                  placeholder:text-[#D9D9D9]"
                  id="grid-last-name"
                  type="number"
                  placeholder="15"
                />
              </div>
              <div className="w-2/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                  htmlFor="grid-last-name"
                >
                  จำนวน (ชิ้น)
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white
                   focus:border-gray-500 placeholder:text-[#D9D9D9]"
                  id="grid-last-name"
                  type="number"
                  placeholder="20"
                />
              </div>
            </div>
            {/* ---------------------------------------------------- */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  URL รูปภาพ
                </label>
                <input
                  onChange={(e) => setImagePreview(e.target.value)}
                  className="appearance-none block w-full bg-white text-gray-700 border
                  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-[#D9D9D9]
                  focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="https://placehold.co/600x400/EEE/31343C"
                />
                <label className="flex tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
                  รูปจะแสดงผลดังนี้
                </label>
                <img
                  className=" w-[170px] h-[100px] object-cover"
                  src={isPreviewImg}
                  alt=""
                />
              </div>
            </div>
            {/* ----------------------------------- */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full  pl-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  บาร์โค้ด
                </label>
                <img src="" alt="" />
                <div className="relative flex w-full">
                  <input
                    className="appearance-none block w-[98%] bg-white text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 placeholder:text-[#D9D9D9]"
                    id="grid-first-name"
                    type="number"
                    placeholder="กดรูปบาร์โค้ดเพื่อสแกน"
                  />
                  <BiBarcodeReader
                    size={30}
                    className=" absolute right-5 mt-[8px] cursor-pointer hover:scale-110 z-50"
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex justify-end'>
                <button
                    className='w-[15.1rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]'>
                    <label htmlFor="">บันทึกข้อมูล</label>
                </button>
            </div>
          </form>
    </div>
  )
}

export default AddNewProduct