export default function Loader(){
       
    return(
       
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative">
        
        {/* Spinner Ring */}
        <div className="w-14 h-14 rounded-full border-4 border-gray-200 
                        border-t-indigo-600 border-r-indigo-400 
                        animate-spin">
        </div>

        {/* Soft Glow */}
        <div className="absolute inset-0 w-14 h-14 rounded-full 
                        bg-indigo-500/10 blur-lg">
        </div>

      </div>
    </div>
    )
}