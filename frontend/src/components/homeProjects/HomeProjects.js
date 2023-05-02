import React, { useState, useEffect, useRef } from 'react';
import './HomeProjects.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';

import HomeProject from '../homeProject/HomeProject';

import { useSelector, useDispatch } from 'react-redux';
import { getAllProjects } from '../../redux/thunks/projects/getAllProjects';
import DeleteProjectModal from '../../modals/deleteProjectModal/DeleteProjectModal';

function HomeProjects() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);
    const projectsUpdated = useSelector(state => state.projects.projectsUpdated);
    const deleteProjectModal = useSelector(state => state.modals.deleteProjectModal);

    const getSortByProjectsPromise = useRef(null);
    const getClearSortProjectsPromise = useRef(null);
    const [sortBy, setsortBy] = useState(null);
    const handleSortBy = (e, filter, order) => {
        Array.from(document.querySelectorAll('.sort-by-item')).forEach(item => {
            item.classList.remove('active');
        })
        e.target.classList.add('active');
        getSortByProjectsPromise.current = dispatch(getAllProjects({filter, order}));
        setsortBy(filter);
    }

    const clearSort = () => {
        Array.from(document.querySelectorAll('.sort-by-item')).forEach(item => {
            item.classList.remove('active');
        });
        getClearSortProjectsPromise.current = dispatch(getAllProjects({filter: 'created_at', order: 'desc'}));
        setsortBy(null);
    }

    useEffect(() => {
        const getAllProjectsPromise = dispatch(getAllProjects({filter: 'created_at', order: 'desc'}));

        return () => {
            getAllProjectsPromise.abort();
            if (getSortByProjectsPromise.current) {
                getSortByProjectsPromise.current.abort();
            }
            if (getClearSortProjectsPromise.current) {
                getClearSortProjectsPromise.current.abort();
            }
        }
    }, [projectsUpdated]);
  return (
    <div className='home-projects'>
        <h1>Projects</h1>
        <div className='filter'>
            <div className='sort-by'>
                <p>Sort By <span><IoIosArrowDown /></span></p>
                <ul className='sort-by-menu'>
                    <li className='sort-by-item' onClick={(e) => handleSortBy(e, "name", "asc")}><AiOutlineSortAscending /> A to Z</li>
                    <li className='sort-by-item' onClick={(e) => handleSortBy(e, "name", "desc")}><AiOutlineSortDescending /> Z to A</li>
                    <li className='sort-by-item' onClick={(e) => handleSortBy(e, "created_at", "asc")}><AiOutlineSortDescending /> Created Date (ASC)</li>
                    <li className='sort-by-item' onClick={(e) => handleSortBy(e, "created_at", "desc")}><AiOutlineSortDescending /> Created Date (DESC)</li>
                </ul>
            </div>
            { sortBy ? <span className='clear-sort-by' onClick={clearSort}>clear <IoCloseSharp /></span> : null}
        </div>
        <div className='projects'>
            {projects ? projects.map((project, i) => <HomeProject key={i} data={project} />) : null} 
        </div>

        <DeleteProjectModal state={deleteProjectModal.state} />
    </div>
  )
}

export default HomeProjects