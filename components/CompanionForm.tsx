"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import {subjects} from "@/constants";
// import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";
import { useState } from "react"


const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.'}),
    subject: z.string().min(1, { message: 'Subject is required.'}),
    topic: z.string().min(1, { message: 'Topic is required.'}),
    voice: z.string().min(1, { message: 'Voice is required.'}),
    style: z.string().min(1, { message: 'Style is required.'}),
    duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
})

// const CompanionForm = () => {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: '',
//             subject: '',
//             topic: '',
//             voice: '',
//             style: '',
//             duration: 15,
//         },
//     })

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         const companion = await createCompanion(values);

//         if(companion) {
//             redirect(`/companions/${companion.id}`);
//         } else {
//             console.log('Failed to create a companion');
//             redirect('/');
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Companion name</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Enter the companion name"
//                                     {...field}
//                                     className="input"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="subject"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Subject</FormLabel>
//                             <FormControl>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="input capitalize">
//                                         <SelectValue placeholder="Select the subject" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {subjects.map((subject) => (
//                                             <SelectItem
//                                                 value={subject}
//                                                 key={subject}
//                                                 className="capitalize"
//                                             >
//                                                 {subject}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="topic"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>What should the companion help with?</FormLabel>
//                             <FormControl>
//                                 <Textarea
//                                     placeholder="Ex. Derivates & Integrals"
//                                     {...field}
//                                     className="input"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="voice"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Voice</FormLabel>
//                             <FormControl>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="input">
//                                         <SelectValue
//                                             placeholder="Select the voice"
//                                         />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="male">
//                                             Male
//                                         </SelectItem>
//                                         <SelectItem value="female">
//                                             Female
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="style"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Style</FormLabel>
//                             <FormControl>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="input">
//                                         <SelectValue
//                                             placeholder="Select the style"
//                                         />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="formal">
//                                             Formal
//                                         </SelectItem>
//                                         <SelectItem value="casual">
//                                             Casual
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="duration"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Estimated session duration in minutes</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     type="number"
//                                     placeholder="15"
//                                     {...field}
//                                     className="input"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
//             </form>
//         </Form>
//     )
// }

const CompanionForm = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [voice, setVoice] = useState('');
    const [style, setStyle] = useState('');
    const [duration, setDuration] = useState(15); // Default duration

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault(); // Prevent default form submission
        setIsSubmitting(true);
        setError('');

        const values = {
            name,
            subject,
            topic,
            voice,
            style,
            duration: Number(duration), // Ensure duration is a number
        };

        try {
            // This is where you'd call your actual createCompanion function
            // const companion = await createCompanion(values);

            // Mocking createCompanion for this example
            console.log('Submitting values:', values);
            const companion = { id: 'mock-' + Date.now(), ...values }; // Mock response
 
            if (companion && companion.id) {
                console.log('Companion created:', companion);
                // redirect(`/companions/${companion.id}`);
                alert(`Companion created! ID: ${companion.id}. Would redirect to /companions/${companion.id}`);
            } else {
                console.log('Failed to create a companion');
                setError('Failed to create a companion. Please try again.');
                // redirect('/');
                alert('Failed to create companion. Would redirect to /');
            }
        } catch (err) {
            console.error('Error creating companion:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Basic styling (optional, can be moved to a CSS file)
    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
        },
        label: {
            marginBottom: '4px',
            fontWeight: 'bold',
        },
        input: {
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: 'calc(100% - 18px)', // Adjust for padding and border
        },
        button: {
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
        }
    };

    return (
    <form
        onSubmit={handleSubmit}
        className="
            flex flex-col gap-4 max-w-lg my-5 mx-auto p-5
            border border-gray-300 rounded-lg
        "
    >
        <div>
            <label
                htmlFor="name"
                className="block mb-1 font-bold"
            >
                Companion name
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the companion name"
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
        </div>

        <div>
            <label
                htmlFor="subject"
                className="block mb-1 font-bold"
            >
                Subject
            </label>
            <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            >
                <option value="">Select the subject</option>
                {subjects.map((s) => (
                    <option key={s} value={s} className="capitalize"> {/* Applied capitalize class */}
                        {s}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label
                htmlFor="topic"
                className="block mb-1 font-bold"
            >
                What should the companion help with?
            </label>
            <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex. Derivates & Integrals"
                className="w-full p-2 border border-gray-300 rounded h-20 resize-y" // Added h-20 and resize-y
                required
            />
        </div>

        <div>
            <label
                htmlFor="voice"
                className="block mb-1 font-bold"
            >
                Voice
            </label>
            <select
                id="voice"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            >
                <option value="">Select the voice</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>

        <div>
            <label
                htmlFor="style"
                className="block mb-1 font-bold"
            >
                Style
            </label>
            <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            >
                <option value="">Select the style</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
            </select>
        </div>

        <div>
            <label
                htmlFor="duration"
                className="block mb-1 font-bold"
            >
                Estimated session duration in minutes
            </label>
            <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="22"
                className="w-full p-2 border border-gray-300 rounded"
                min="1"
                required
            />
        </div>

        {error && (
            <p className="text-red-600 mt-2"> {/* Mapped from styles.errorMessage */}
                {error}
            </p>
        )}

        <button
            type="submit"
            className="
                w-full py-2 px-4 bg-blue-600 text-white text-base
                border-none rounded cursor-pointer
                hover:bg-blue-700
                disabled:opacity-75 disabled:cursor-not-allowed
            "
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Building...' : 'Build Your Companion'}
        </button>
    </form>
);
}

export default CompanionForm