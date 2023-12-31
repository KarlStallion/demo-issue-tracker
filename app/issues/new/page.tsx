'use client';

import React, { useState } from "react";
import {Button, Callout, CalloutRoot, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}
const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
    const [error, setError] = useState('');

    return (
        <div className={'max-w-xl'}>
            {error && (
                <CalloutRoot color={'red'} className={'mb-5'}>
                <Callout.Text>{error}</Callout.Text>
            </CalloutRoot>
            )}
        <form
            className={'space-y-3'}
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setError('Something went wrong');
                }
            })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')}/>
            </TextField.Root>
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder={'Description'} {...field}/>}
            />
            <Button>Submit New Issue</Button>
        </form>
        </div>
    )
}

export default NewIssuePage