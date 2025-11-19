import React from "react";
import { getWorkspaceMembers } from "@/app/data/workspace/get-workspace-members";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ workspaceId: string }>;
}

const MembersPage = async ({ params }: Props) => {
  const { workspaceId } = await params;
  const result = await getWorkspaceMembers(workspaceId);

  if (result.error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive text-lg">{result.message}</p>
      </div>
    );
  }

  const { workspaceMembers } = result;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workspace Members</h1>
        <p className="text-muted-foreground mt-1">
          Manage and view all members of this workspace
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspaceMembers && workspaceMembers.length > 0 ? (
              workspaceMembers.map((member: any) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.user?.image || ""} />
                        <AvatarFallback>
                          {member.user?.name?.charAt(0).toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {member.user?.name || "Unknown"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{member.user?.email || "N/A"}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {member.projectAccess?.length || 0} projects
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <p className="text-muted-foreground">No members found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersPage;
