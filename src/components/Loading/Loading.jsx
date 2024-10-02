import spinner from "../../assets/spinner-icon.png"
export default function Loading() {
  return (
    <div className='loading_container'>
      <div className='loading_spinner'>
        <img src={spinner} alt="loading" />
        Loading...
      </div>
    </div>
  )
}
