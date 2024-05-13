import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-300 to-green-300">
      <div className="text-center flex justify-center items-center gap-2">
        <CgSpinnerTwoAlt className="animate-spin h-16 w-16 text-gray-800" />
        <p className="text-gray-800 text-xl ">Loading Amz Price Tracker...</p>
      </div>
    </div>
  )
}

export default Loading