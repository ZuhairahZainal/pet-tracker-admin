export interface AdminNotif {
  time: number,
  date: string,
  reportDescription: string,
  reportId: string,
  reportProof: string,
  reportStatus: string,
  reportType: string,
  userEmail: string,
  userId: string,
  userName: string,
  userImage: string,
  // post report
  ownerId: string,
  postId: string,
}
