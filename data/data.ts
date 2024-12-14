// import { boards } from "@/types/datatypes";

// export const project: boards[] = [
//     {
//         boardId: 1,
//         boardName: "Project for New Feature",
//         boardDesc: "Make new feature to add favorite item.",
//         lanes: [
//             {
//                 laneId: 1,
//                 laneName: "To Do",
//                 cards: [
//                     {
//                         cardId: 0,
//                         cardName: "Research for design",
//                         cardDesc: "Do some research UX to create the UI for favorite.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Check dribbble for reference",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Determine prototype flow of the feature",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 3,
//                                 checklistText: "Determine components to use for the UI later",
//                                 checklistCond: true,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Research",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "High-Priority",
//                             },
//                             {
//                                 labelId: 3,
//                                 labelName: "UI/UX",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 1,
//                                 assigneeName: "Kila",
//                                 assigneeRole: "UX Researcher",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                             {
//                                 assigneeId: 2,
//                                 assigneeName: "Mika",
//                                 assigneeRole: "UX Designer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                             {
//                                 assigneeId: 3,
//                                 assigneeName: "Dona",
//                                 assigneeRole: "UI Designer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-10T14:30:00Z"
//                     },
//                     {
//                         cardId: 1,
//                         cardName: "Create wireframes",
//                         cardDesc: "Design wireframes for the favorite item feature.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Sketch initial ideas",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Use Figma for high-fidelity wireframes",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Design",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "Medium-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 4,
//                                 assigneeName: "Rina",
//                                 assigneeRole: "UX Designer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-15T14:30:00Z"
//                     },
//                 ]
//             },
//             {
//                 laneId: 2,
//                 laneName: "In Progress",
//                 cards: [
//                     {
//                         cardId: 2,
//                         cardName: "Create wireframes",
//                         cardDesc: "Design wireframes for the favorite item feature.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Sketch initial ideas",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Use Figma for high-fidelity wireframes",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Design",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "Medium-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 4,
//                                 assigneeName: "Rina",
//                                 assigneeRole: "UX Designer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-15T14:30:00Z"
//                     },
//                     {
//                         cardId: 3,
//                         cardName: "Develop Frontend",
//                         cardDesc: "Implement the UI for the favorite item feature.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Set up project structure",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Create components for favorite items",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Development",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "High-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 5,
//                                 assigneeName: "Joko",
//                                 assigneeRole: "Frontend Developer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-25T14:30:00Z"
//                     }
//                 ]
//             },
//             {
//                 laneId: 3,
//                 laneName: "Done",
//                 cards: [
//                     {
//                         cardId: 4,
//                         cardName: "Test functionality",
//                         cardDesc: "Ensure the favorite item feature works as intended.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Conduct unit tests",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Gather feedback from team",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Testing",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 6,
//                                 assigneeName: "Tina",
//                                 assigneeRole: "QA Engineer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-12-01T14:30:00Z"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         boardId: 2,
//         boardName: "Bug Fixes",
//         boardDesc: "Address and resolve bugs found in the current project.",
//         lanes: [
//             {
//                 laneId: 1,
//                 laneName: "To Fix",
//                 cards: [
//                     {
//                         cardId: 1,
//                         cardName: "Fix layout issue on mobile",
//                         cardDesc: "Ensure the favorite items layout is responsive on mobile devices.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Test on various mobile devices",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Adjust CSS for better layout",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Bug",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "High-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 7,
//                                 assigneeName: "Ravi",
//                                 assigneeRole: "Frontend Developer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-20T14:30:00Z"
//                     }
//                 ]
//             },
//             {
//                 laneId: 2,
//                 laneName: "In Progress",
//                 cards: [
//                     {
//                         cardId: 2,
//                         cardName: "Fix API response issue",
//                         cardDesc: "Resolve issues with API response times for favorite items.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Analyze API logs",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Implement caching for API calls",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Bug",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "Medium-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 8,
//                                 assigneeName: "Anya",
//                                 assigneeRole: "Backend Developer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-22T14:30:00Z"
//                     }
//                 ]
//             },
//             {
//                 laneId: 3,
//                 laneName: "Resolved",
//                 cards: [
//                     {
//                         cardId: 3,
//                         cardName: "Fix user profile bug",
//                         cardDesc: "Resolve the bug causing user profiles to not load.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Test with various user accounts",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Review user profile loading code",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Bug",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 9,
//                                 assigneeName: "Liam",
//                                 assigneeRole: "QA Engineer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-11-30T14:30:00Z"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         boardId: 3,
//         boardName: "Feature Improvements",
//         boardDesc: "Enhancements and optimizations for existing features.",
//         lanes: [
//             {
//                 laneId: 1,
//                 laneName: "To Do",
//                 cards: [
//                     {
//                         cardId: 1,
//                         cardName: "Improve loading times",
//                         cardDesc: "Optimize loading times for the favorite items page.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Analyze current loading performance",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Implement lazy loading for images",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Enhancement",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "High-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 10,
//                                 assigneeName: "Ella",
//                                 assigneeRole: "Frontend Developer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-12-10T14:30:00Z"
//                     }
//                 ]
//             },
//             {
//                 laneId: 2,
//                 laneName: "In Progress",
//                 cards: [
//                     {
//                         cardId: 2,
//                         cardName: "Enhance user notification system",
//                         cardDesc: "Revamp the notification system for better user engagement.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Gather feedback from users",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Design new notification layouts",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Enhancement",
//                             },
//                             {
//                                 labelId: 2,
//                                 labelName: "Medium-Priority",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 11,
//                                 assigneeName: "Noah",
//                                 assigneeRole: "UI Designer",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-12-15T14:30:00Z"
//                     }
//                 ]
//             },
//             {
//                 laneId: 3,
//                 laneName: "Completed",
//                 cards: [
//                     {
//                         cardId: 3,
//                         cardName: "Update onboarding process",
//                         cardDesc: "Revise the onboarding process for new users.",
//                         checklist: [
//                             {
//                                 checklistId: 1,
//                                 checklistText: "Create new onboarding materials",
//                                 checklistCond: false,
//                             },
//                             {
//                                 checklistId: 2,
//                                 checklistText: "Implement feedback from beta users",
//                                 checklistCond: false,
//                             },
//                         ],
//                         labels: [
//                             {
//                                 labelId: 1,
//                                 labelName: "Enhancement",
//                             },
//                         ],
//                         assignee: [
//                             {
//                                 assigneeId: 12,
//                                 assigneeName: "Maya",
//                                 assigneeRole: "Product Manager",
//                                 assigneeImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
//                             },
//                         ],
//                         dueDate: "2024-12-20T14:30:00Z"
//                     }
//                 ]
//             }
//         ]
//     }
// ];
