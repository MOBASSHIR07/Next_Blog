import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle, Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        )}
        {post.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 border-none">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-[10px]">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {post.views}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" /> {post._count?.comments || 0}
          </span>
        </div>
        <Link
          href={`/blogs/${post.id}`}
          className="text-sm font-bold text-primary hover:underline"
        >
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}