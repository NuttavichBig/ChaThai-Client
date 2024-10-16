import Header from "./components/Header"
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <div>
      <Header />
      <div className='w-screen h-screen fixed bg-main -z-10 min-h-fit'></div>
      <AppRouter/>
    </div>
  )
}