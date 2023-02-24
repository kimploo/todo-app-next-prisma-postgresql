import Image from "next/image"

const Images : React.FC<{property? : string, src: string, width : number, height : number}> = ({property = "rounded-full", src, width, height}) => {
  return (
    <>
        {src ? <>
            <Image className={`${property}`} src={src} width={width} height={height} alt="profile image" />
        </> : <>
            <Image className={`${property}`} src="/profile.png" width={width} height={height} alt="profile image" />
        </>
        }
    </>
  )
}

export default Images