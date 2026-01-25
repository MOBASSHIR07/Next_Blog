import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { env } from '@/env';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
const API_URL = env.API_URL


const CreateBlog = () => {

    const createBlog = async (formData: FormData) => {
        "use server"
        const title = formData.get('title');
        const content = formData.get('content');
        const tag = formData.get('tags') as string;

        const tags = tag ? tag.split(',').map(t => t.trim()).filter(i=>i!=="") : []

        const payload = {
            title,
            content,
            tags
        };
        console.log(payload);
        const cookieStore = await cookies()

        const res = await fetch(`${API_URL}/posts`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                Cookie : cookieStore.toString()
            },
            body: JSON.stringify(payload)
        })
        if(res.ok){
            revalidateTag("blogpost", "max")
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>Share your thoughts and tags here</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="blog-form" action={createBlog} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="Blog Title" required />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Input
                            id="content"
                            name="content"
                            placeholder="Write your blog content..."
                            className="min-h-37.5"
                            required
                        />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" name="tags" placeholder="react, nextjs, tech" />
                    </div>
                </form>
            </CardContent>

            <CardFooter>

                <Button type="submit" form="blog-form" className="w-full">
                    Publish Blog
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CreateBlog;