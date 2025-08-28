import React from 'react';
import { LuPlus } from "react-icons/lu";
import { FaCode, FaDatabase, FaProjectDiagram } from "react-icons/fa";
import { SiReact, SiPython, SiGo } from "react-icons/si";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from "moment";
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertConent from '../../components/DeleteAlertConent';


const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState(null);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try{
      setIsLoadingSessions(true);
      const response=await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
       console.log("Sessions:", response.data); 
      setSessions(response.data);

    }
    catch(error){
      console.log("Error fetching session data:",error)
    }
    finally{
      setIsLoadingSessions(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }

  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div
        className='min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-[#f8fafc]'
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(255,147,36,0.06) 0, rgba(255,147,36,0) 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.06) 0, rgba(14,165,233,0) 45%)",
        }}
      >
        <div className='container mx-auto pt-4 pb-28'>
          {/* New user welcome card when there are no sessions */}
          {!isLoadingSessions && Array.isArray(sessions) && sessions.length === 0 && (
            <div className='px-4 md:px-4'>
              <div className='w-full rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 mb-8'>
                <div className='flex items-start gap-4'>
                  <div className='h-12 w-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm'>
                    <LuPlus className='text-2xl'/>
                  </div>
                  <div>
                    <h2 className='text-xl md:text-2xl font-semibold text-slate-800 mb-1'>Welcome!</h2>
                    <p className='text-slate-600'>Looks like you’re new here. Tap the ➕ button below to create your first interview role and start preparing.</p>
                  </div>
                </div>
                <div className='mt-5'>
                  <button
                    onClick={()=>setOpenCreateModal(true)}
                    className='inline-flex items-center gap-2 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-white font-medium px-5 py-2.5 rounded-full hover:opacity-95 active:opacity-90'
                  >
                    <LuPlus className='text-lg' /> Create your first role
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing sessions grid (old users) */}
          {!isLoadingSessions && Array.isArray(sessions) && sessions.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pb-6 px-4 md:px-4'>
              {sessions.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))}
            </div>
          )}

          {/* Trending Job Roles - always visible near bottom */}
          <div className='px-4 md:px-4 pt-6 pb-8 mt-10 md:mt-16'>
            <h3 className='text-lg md:text-xl font-semibold text-slate-800 mb-4'>📈 Trending Job Roles</h3>
            <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4'>
              {[ 
                { title: 'Software Engineer', icon: <FaCode className='text-lg md:text-xl'/>, desc: 'Build reliable software systems and ship features end‑to‑end.' },
                { title: 'Frontend Developer', icon: <SiReact className='text-lg md:text-xl'/>, desc: 'Craft delightful, accessible user interfaces with modern frameworks.' },
                { title: 'Backend Developer', icon: <FaDatabase className='text-lg md:text-xl'/>, desc: 'Design APIs, data flows, and scalable server architectures.' },
                { title: 'Data Scientist', icon: <SiPython className='text-lg md:text-xl'/>, desc: 'Analyze data, build models, and turn insights into impact.' },
                { title: 'Product Manager', icon: <FaProjectDiagram className='text-lg md:text-xl'/>, desc: 'Define product vision and align teams to deliver value.' },
                { title: 'Golang Developer', icon: <SiGo className='text-lg md:text-xl'/>, desc: 'Build fast, concurrent services with Go and modern tooling.' },
              ].map((role, i) => (
                <div
                  key={i}
                  className='group relative overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200 p-3 md:p-4 flex flex-col items-center justify-center w-28 h-20 md:w-32 md:h-24 hover:w-56 md:hover:w-64 hover:h-28 md:hover:h-32 hover:z-30'
                >
                  <div className='default-state flex flex-col items-center gap-2 transition-opacity duration-150 group-hover:opacity-0'>
                    <div className='h-8 w-8 md:h-9 md:w-9 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center transition-colors'>
                      {role.icon}
                    </div>
                    <div className='text-xs md:text-sm font-medium text-slate-700 text-center'>
                      {role.title}
                    </div>
                  </div>
                  <div className='hover-state absolute inset-0 p-3 md:p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150'>
                    <div className='text-[11px] md:text-sm text-slate-600 text-center leading-snug whitespace-normal break-words'>
                      {role.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating add button */}
          <button
            className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl  hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
            onClick={()=>setOpenCreateModal(true)}
          >
            <LuPlus className='text-2xl text-white'></LuPlus>
            Add New
          </button>
        </div>
      </div>

      <Modal 
        isOpen={openCreateModal}
        onClose={()=>{
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm/>
        </div>
      </Modal>
      <Modal 
        isOpen={openDeleteAlert?.open}
        onClose={()=>{
          setOpenDeleteAlert({open:false,data:null});
        }}
        title="Delete Alert"
      >
        <div className='w-[30vw]'>
          <DeleteAlertConent
            content="Are you sure you want to delete this session details?"
            onDelete={()=>deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard;
