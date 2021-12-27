function ViewLoading() {
    return (
        <div className="w-full md:w-2/3  md:m-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-[#353131] rounded"></div>
                    <div className="space-y-3">
                        <div className="h-60 bg-[#353131] rounded col-span-2"></div>
                        <div className="h-10 bg-[#353131] rounded col-span-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoading
