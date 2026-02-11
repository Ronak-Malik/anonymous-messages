'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { Message } from '@/model/user.model';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { toast, Toaster } from 'sonner';




function userDashboard() {
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setisLoading] = useState(false);
const [isSwitchLoading , setisSwitchLoading] = useState(false);


const handleDeleteMessage = (messageId:string) => {
  setMessages(messages.filter((message) => message._id !== messageId));

};

const {data:session} = useSession();

const form = useForm({
    resolver:zodResolver(AcceptMessageSchema),

});

const {register, watch, setValue } = form;
const acceptMessages = watch('acceptMessages');

const fetchAcceptMessages = useCallback(async () => {
    setisSwitchLoading(true);

    try{
        const response = await axios.get<ApiResponse>('/api/accept-message');
        setValue('acceptMessages',response.data.isAcceptingMessages as boolean);
     }catch(error){
        const axiosError = error as AxiosError<ApiResponse>
        const errorMessage = axiosError.response?.data.message?? 'failed to fetch message setting';
        toast.error(errorMessage);
     }finally{
        setisSwitchLoading(false);
     }

},[setValue,toast]);

const fetchMessages = useCallback( async(refresh: boolean = false)=>{

    setisLoading(true);
    setisSwitchLoading(false);
    try{
        const response = await axios.get<ApiResponse>('/api/get-message');
        setMessages(response.data.messages || []);
        //if(refresh){
           // toast.success(response.data.messages || [])
        //}
    }catch(error){
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage= axiosError.response?.data.message??'failed to fetch messages';
        toast.error(errorMessage);
    }finally{
        setisLoading(false);
        setisSwitchLoading(false);
    }

},[setisLoading,setisSwitchLoading,toast]);

useEffect(()=>{
    if(!session || !session.user) return ;
    fetchMessages();
    fetchAcceptMessages();

},[session,fetchAcceptMessages,fetchMessages,setValue,toast]);

//now handle switch change of accepting messages
const handleSwitch = async()=>{
    try{
        const response = await axios.post<ApiResponse>('/api/accept-message',{
            acceptMessages:!acceptMessages,
        });
        setValue('acceptMessages',!acceptMessages);
        toast.success(response.data.message);
        
    }catch(error){
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data.message?? 'failed to update message setting';
        toast.error(errorMessage);
    }
};

  if (!session || !session.user) {
    return <div></div>;
}

const {username}= session.user as User;

const baseUrl = window.location.origin;
const profileUrl = `${baseUrl}/u/${username}`;

const copytoClipBoard = () =>{
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile Url copied successfully");
}
 return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copytoClipBoard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitch}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default userDashboard;


