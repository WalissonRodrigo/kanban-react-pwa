import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const FullSizeFlexBoxStart = styled(CenteredFlexBox)({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  height: '100%',
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, FullSizeFlexBoxStart };
