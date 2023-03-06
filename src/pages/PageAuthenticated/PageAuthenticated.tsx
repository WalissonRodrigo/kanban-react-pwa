import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function PageAuthenticated() {
  return (
    <>
      <Meta title="page-2" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Page Authenticated</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageAuthenticated;
