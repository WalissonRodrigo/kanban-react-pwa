import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useUserActions } from '@/store/_actions';

function Logout() {
  const userActions = useUserActions();
  userActions.logout()
  return (
    <>
      <Meta title="logout" />
      <FullSizeCenteredFlexBox>
        <Typography variant="button" onClick={() => userActions.logout()}>
          Logout
        </Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Logout;
