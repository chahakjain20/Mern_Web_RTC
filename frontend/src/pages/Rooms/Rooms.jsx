import React, { useState } from 'react'
import styles from './Rooms.module.css'
import RoomCard from '../../components/RoomCard/RoomCard';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';



const rooms = [
  {
    id: 1,
    topic: 'Which framework best for frontend ?',
    speakers: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/images/monkey.png',
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: '/images/monkey.png',
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: 'What’s new in machine learning?',
    speakers: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/images/monkey.png',
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: '/images/monkey.png',
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: 'Why people use stack overflow?',
    speakers: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/images/monkey.png',
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: '/images/monkey.png',
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: 'Artificial inteligence is the future?',
    speakers: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/images/monkey.png',
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: '/images/monkey.png',
      },
    ],
    totalPeople: 40,
  },
];


const Rooms = () => {

  const [showModal,setShowModal] = useState(false);
  
  function openModal() {
    setShowModal(true);
  }

  return (
    <>
      <div className='container'>
        <div className={styles.roomsHeader}>
          <div className={styles.left}>

            <span className={styles.heading}> All Voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <img src="/images/add.png" alt="add_room" />
              <span>Start a room</span>
            </button>

          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {
        showModal &&  <AddRoomModal onClose={() => setShowModal(false)}/>
      }
    </>
  );
}

export default Rooms;