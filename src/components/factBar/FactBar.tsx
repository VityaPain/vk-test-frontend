import { useEffect, useCallback, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form";


import {
    Input,
    FormItem
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

type FormValuesType = {
    fact: string
}

const FactBar = () => {
    const form = useForm<FormValuesType>({
        defaultValues: {
            fact: ""
        }
    })
    const { register, handleSubmit } = form;
    const { ref, ...rest } = register('fact'); 
    const inputRef = useRef<HTMLInputElement>(null)

    const sendRequest = useCallback(async () => {
        const responce = await fetch('https://catfact.ninja/fact')

        return responce.json()
    }, [])

    const onSubmit = () => {
        refetch()
    }

    const getSecondWord = (sentence: string) => {
        return sentence.indexOf(' ' + sentence.split(' ')[1])
    }

    const { data, refetch } = useQuery({
        queryKey: ['fact'],
        queryFn: () => sendRequest(),
        enabled: false
    })

    const setFact = useCallback(() => {
        if (inputRef.current) {
            inputRef.current!.value = data?.fact
        
            const positionCursor = getSecondWord(data?.fact)
            inputRef.current!.setSelectionRange(positionCursor, positionCursor);
            inputRef.current!.focus()
        }
    }, [data?.fact])

    useEffect(() => {
        if (data) {
            setFact()
        }
    }, [data])


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormItem htmlFor="fact" top="Факт" >
                <Input
                    type="text"
                    id="fact"
                    { ...rest }
                    getRef={inputRef}
                ></Input>
            </FormItem>
            <FormItem>
                <Input
                    type="submit"
                    value="Получить"
                >
                </Input>
            </FormItem>
        </form>
    )
}

export default FactBar