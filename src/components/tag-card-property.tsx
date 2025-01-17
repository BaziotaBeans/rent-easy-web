interface TagCardPropertypROPS {
    type: string
}

export function TagCardProperty({ type }:TagCardPropertypROPS) {
    return (
        <span className="bg-white rounded-lg absolute left-2 top-4 z-10 px-2 font-semibold text-sm shadow">
            {type}
        </span>
    );
}