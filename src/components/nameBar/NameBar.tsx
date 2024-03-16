import { useState, useRef, useCallback} from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormValuesType = {
    name: string
}

const NameBar = () => {
    const schema = yup.object({
        name: yup
                .string()
                .required("Поле обязательно для заполнения")
                .matches(/^[a-zA-Z]+$/, 'Поле должно содержать только латинские буквы')
    });

    const form = useForm<FormValuesType>({
        defaultValues: {
            name: ""
        },
        resolver: yupResolver(schema),
    });
    
    const { register, handleSubmit } = form;
    const { ref, ...rest } = register("name")
    const [ err, setErr ] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    let timer: NodeJS.Timeout

    const handleInput = useCallback(() => {
        clearTimeout(timer)

        if (isPending) {
            queryClient.cancelQueries({ queryKey: ['name'] })
        }

        try {
            schema.validateSync({name: inputRef.current!.value})
            setErr('')

            setTimeout(() => {
                onSubmit()
            }, 3000)
        } catch (e) {
            //@ts-ignore
            setErr(e.message)
        }
    }, [err])

    const [name, setName] = useState<string>('')
    const queryClient = useQueryClient()
    const fetchData = async (name: string) => {
        const responce = await fetch('https://api.agify.io/?name=' + name)
    
        return responce.json()
    }
    const { data, isPending }  = useQuery({
        queryKey: ['name', name],
        queryFn: () => fetchData(name),
        enabled: name.length > 0
    })

    const onSubmit = () => {
        if (isPending) {
            queryClient.cancelQueries({ queryKey: ['name'] })
        }
        setName(inputRef.current!.value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Имя:
                <input
                    type="text" 
                    id="name"
                    onInput={() => handleInput()} 
                    ref={inputRef}
                    {...rest}
                ></input>
            </label> 
            <br />
            {
                err && (
                    <p className="error">{err}</p>
                ) 
            }
            <button onClick={onSubmit}>Submit</button>
            {data !== undefined && <p>{data.age || 'Что-то пошло не так'}</p>}
        </form>
    )
}

export default NameBar