'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { FaCircleExclamation } from "react-icons/fa6"

type InputLoginData = {
  email: string;
  password: string;
}

const loginUseFormSchema = z.object({
  email: z.string()
  .email({message: 'Formato de email inválido'})
  .min(5, {message: 'Email obrigatório'}),
  password: z.string()
  .min(1, {message: 'Senha obrigatória'}),
})

export default function Home() {
  const {register, handleSubmit, formState: {errors}} = useForm<InputLoginData>({
    resolver: zodResolver(loginUseFormSchema),
  });

  const loginUse: SubmitHandler<InputLoginData> = ({email, password}) => {
    console.log({email, password})
  }
  
  return (
   <form className="flex flex-col items-center justify-center w-2/6 gap-5" onSubmit={handleSubmit(loginUse)}>
      <h1 className="font-bold text-3xl mb-5">Login</h1>
      <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">E-mail:</label>
        <input type="email" {...register('email')} className="h-9 rounded border" autoComplete="email"/>
        <span className="h-2 p-2 flex items-center gap-2 text-sm text-red-500">{ errors.email && (
          <> 
            <FaCircleExclamation/> 
            {errors.email.message}
          </>
          )}</span>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" >Senha:</label>
        <input type="password" className="h-9 rounded border" autoComplete="password" {...register('password')}/>
         <span className="h-2 p-2 flex items-center gap-2 text-sm text-red-500">{ errors.password && (
          <> 
            <FaCircleExclamation/> 
            {errors.password.message}
          </>
          )}</span>
      </div>
       <button className=" bg-slate-950 text-sky-50 h-12 rounded shadow ">Entrar</button>
      </div>
      
   </form>
  );
}
