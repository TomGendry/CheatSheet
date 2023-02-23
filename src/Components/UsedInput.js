export const Message = ({label, placeholder, size,onChange, value}) => {
    
    const taille = size ? size : "h-40"

    return (
        <div className="text-sm">
            <label className="text-border font-semibold">{label}</label>
            <textarea spellCheck="false" value={value} className={`w-full ${taille} mt-2 p-6 border bg-main border-border rounded`} placeholder={placeholder} onChange={onChange}>

            </textarea>
        </div>
    )

}

export const Select = ({space, label, options, onChange}) => {
    const spaceCSS = (space === true) ? "mt-3" : "mt-2"
    let temp = "CHOICE"
    if (options[0]) {
        temp = options[0].value
    }
    return (
        <div>
            <label className="text-border font-semibold">{label}</label>
            <select onChange={onChange} defaultValue={`${temp}`} className={`w-full ${spaceCSS} px-6 py-4 text-text bg-main border border-border rounded`}>
                {options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    )
}

export const Input = ({label, placeholder,type,bg,onChange, value}) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <input required type={type} value={value} placeholder={placeholder} className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
                bg ? 'bg-main' : "bg-dry"
            }`}
            
            onChange={onChange}/>
        </div>
    )
}