import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Components/Login/Login"
import StaffMainLayout from "./Components/staff/Layouts/StaffMainLayout"
import DashboardLayout from "./Components/staff/Layouts/DashboardLayout"
import FeesAndPaymentLayout from "./Components/staff/Layouts/FeesAndPaymentLayout"
import FineScreen from "./Components/staff/Screens/FineScreen"
import RefundScreen from "./Components/staff/Screens/RefundScreen"
import MessLayout from "./Components/staff/Layouts/MessLayout"
import MessAllocationScreen from "./Components/staff/Screens/MessAllocationScreen"
import MessFeedbacksScreen from "./Components/staff/Screens/MessFeedbacksScreen"
import MessCancellationScreen from "./Components/staff/Screens/MessCancellationScreen"
import MessWeeklyMenuScreen from "./Components/staff/Screens/MessWeeklyMenuScreen"
import ComplaintsLayout from "./Components/staff/Layouts/ComplaintsLayout"
import LostAndFoundLayout from "./Components/staff/Layouts/LostAndFoundLayout"
import HostelNoticeboardLayout from "./Components/staff/Layouts/HostelNoticeboardLayout"
import StudentsLayout from "./Components/staff/Layouts/StudentsLayout"
import StudentListScreen from "./Components/staff/Screens/StudentListScreen"
import StudentProfileScreen from "./Components/staff/Screens/StudentProfileScreen"
import HostelRoomsLayout from "./Components/staff/Layouts/HostelRoomsLayout"
import RoomListScreen from "./Components/staff/Screens/RoomListScreen"
import RoomDetailScreen from "./Components/staff/Screens/RoomDetailScreen"
import PaymentRecieptScreen from "./Components/staff/Screens/PaymentRecieptScreen"
import StudentMainLayout from "./Components/student/Layouts/StudentMainLayout"
import DashboardStudentLayout from "./Components/student/Layouts/DashboardStudentLayout"
import PaymentAndFeeStudentLayout from "./Components/student/Layouts/PaymentAndFeeStudentLayout"
import AcademicFeeStudentScreen from "./Components/student/Screens/AcademicFeeStudentScreen"
import MessFeeStudentScreen from "./Components/student/Screens/MessFeeStudentScreen"
import RefundStudentScreen from "./Components/student/Screens/RefundStudentScreen"
import FinesStudentScreen from "./Components/student/Screens/FinesStudentScreen"
import MessStudentLayout from "./Components/student/Layouts/MessStudentLayout"
import TodayMenuScreen from "./Components/student/Screens/TodayMenuScreen"
import WeekMenuScreen from "./Components/student/Screens/WeekMenuScreen"
import FeedbackAndCancellationScreen from "./Components/student/Screens/FeedbackAndCancellationScreen"
import ComplaintsStudentLayout from "./Components/student/Layouts/ComplaintsStudentLayout"
import LostAndFoundStudentLayout from "./Components/student/Layouts/LostAndFoundStudentLayout"
import HostelRulesStudentLayout from "./Components/student/Layouts/HostelRulesStudentLayout"
import AddStudentScreen from "./Components/staff/Screens/AddStudentScreen"
import UserContextProvider from "./Context/UserContextProvider"
import PrivateRoutes from "./Components/Privatisation/PrivateRoutes"
import StudentProfileLayout from "./Components/student/Layouts/StudentProfileLayout"
import GuardianAiLayout from "./Components/student/Layouts/GuardianAiLayout"

function App() {

  const router= createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      element: <PrivateRoutes />,
      children:[
    
      {
        path: '/student',
        element: <StudentMainLayout />,
        children: [
          {
            path: '',
            element: <DashboardStudentLayout />,
          },
          {
            path: 'profile',
            element: <StudentProfileLayout />,
          },
          {
            path: 'guardian-ai',
            element: <GuardianAiLayout />,
          },
          {
            path: 'paymentandfines',
            element: <PaymentAndFeeStudentLayout />,
            children:[
              {
                path: 'academicfee',
                element: <AcademicFeeStudentScreen />
              },
              {
                path: 'messfee',
                element: <MessFeeStudentScreen />
              },
              {
                path: 'refund',
                element: <RefundStudentScreen />
              },
              {
                path: 'fines',
                element: <FinesStudentScreen />
              }
            ] 
          },
          {
            path: 'mess',
            element: <MessStudentLayout />,
            children:[
              {
                path: 'todaymenu',
                element: <TodayMenuScreen />
              },
              {
                path: 'weekmenu',
                element: <WeekMenuScreen />
              },
              {
                path: 'cancellationandfeedback',
                element: <FeedbackAndCancellationScreen />
              },
            ] 
          },
          {
            path: 'complaints',
            element: <ComplaintsStudentLayout/>
          },
          {
            path: 'lostandfound',
            element: <LostAndFoundStudentLayout />,
          },
          {
            path: 'hostelrules',
            element: <HostelRulesStudentLayout />,
          }
        ]
      },
      {
        path: '/staff',
        element: <StaffMainLayout />,
        children: [
          {
            path: '',
            element: <DashboardLayout />,
          },
          {
            path: 'feesandpayments',
            element: <FeesAndPaymentLayout />,
            children:[
              {
                path: 'reciept',
                element: <PaymentRecieptScreen />
              },
              {
                path: 'fine',
                element: <FineScreen />
              },
              {
                path: 'refund',
                element: <RefundScreen />
              }
            ] 
          },
          {
            path: 'mess',
            element: <MessLayout />,
            children:[
              {
                path: 'allocation',
                element: <MessAllocationScreen />
              },
              {
                path: 'feedback',
                element: <MessFeedbacksScreen />
              },
              {
                path: 'cancellation',
                element: <MessCancellationScreen />
              },
              {
                path: 'weeklymenu',
                element: <MessWeeklyMenuScreen />
              }
            ] 
          },
          {
            path: 'complaints',
            element: <ComplaintsLayout />,
          },
          {
            path: 'lostandfound',
            element: <LostAndFoundLayout />,
          },
          {
            path: 'noticeboard',
            element: <HostelNoticeboardLayout />,
          },
          {
            path: 'students',
            element: <StudentsLayout />,
            children:[
              {
                path: '',
                element: <StudentListScreen />
              },
              {
                path: ':studentId',
                element: <StudentProfileScreen />
              },
              {
                path: 'addstudent',
                element: <AddStudentScreen />
              }
              
            ]
          },
          {
            path: 'hostelrooms',
            element: <HostelRoomsLayout />,
            children:[
              {
                path: '',
                element: <RoomListScreen />
              },
              {
                path: ':userId',
                element: <RoomDetailScreen />
              },
              
            ]
          },
        ]
      }
    ]}
  ])


  return (
    <>
      <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
    </>
  )
}

export default App
