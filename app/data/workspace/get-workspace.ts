import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated";
import { redirect } from "next/navigation";

export const getWorkspaceById = async (workspaceId: string) => {
  const { user } = await userRequired();

  if (!user) {
    redirect("/login");
  }

  const isUserMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });

  if (!isUserMember) {
    throw new Error("Unauthorized access");
  }

  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: { select: { userId: true, accessLevel: true } },
    },
  });

  return { data: workspace };
};
