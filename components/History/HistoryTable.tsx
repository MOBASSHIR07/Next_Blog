import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BlogPost } from "../BlogCard";


interface HistoryTableProps {
  posts: BlogPost[]; 
}

const HistoryTable = ({ posts }: HistoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Views</TableHead>
          <TableHead className="text-right">Comments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.length > 0 ? (
          posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.tags?.join(", ") || "No Tags"}</TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell className="text-right">
                {post._count?.comments || 0}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No posts found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;