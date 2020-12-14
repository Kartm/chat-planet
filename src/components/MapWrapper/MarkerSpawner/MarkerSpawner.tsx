import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import Flag from '../../reusable/Flag/Flag';
import SepiaButton from '../../reusable/SepiaButton/SepiaButton';
import './MarkerSpawner.css';
import { User, Users, UserStatus } from '../../../models/User.interface';
import Invitation from '../../../models/Invitation';

type MarkerSpawnerProps = {
  user: User | null;
  users: Users | null;
  sendInvitation: (invitation: Invitation) => void;
};

const MarkerSpawner = ({ user, users, sendInvitation }: MarkerSpawnerProps) => {
  let result: JSX.Element[] = [];

  if (users) {
    Object.values(users).forEach((markerUser, i) => {
      let markerClass = null;
      const isMyMarker = user && user.name === markerUser.name;
      if (isMyMarker) markerClass = 'me';
      else {
        switch (markerUser.status) {
          case UserStatus.FREE:
            markerClass = 'free';
            break;
          default:
            markerClass = 'busy';
            break;
        }
      }

      const icon = divIcon({ className: `markerIcon-${markerClass}` });
      result.push(
        <Marker position={[markerUser.latitude, markerUser.longitude]} icon={icon} key={i}>
          <Popup>
            <span>
              <Flag countryCode={markerUser.countryCode} /> {markerUser.countryCode}
            </span>

            <p>{markerUser.name}</p>
            {isMyMarker === false && (
              <SepiaButton
                onClick={() => {
                  sendInvitation({
                    from: user as User,
                    to: markerUser as User,
                  });
                }}
              >
                Invite
              </SepiaButton>
            )}
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <>
      {result.map((marker) => (
        <>{marker}</>
      ))}
    </>
  );
};

export default MarkerSpawner;
