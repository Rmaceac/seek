import { Card, CardContent, Table, Typography } from '@mui/material'
import FollowListItem from './FollowListItem'
import { deepOrange } from '@mui/material/colors';


const FollowList = () => {
  
  return (
    <Card className='info-card-contents' sx={{ maxWidth: 345 }}>
      <CardContent>
      <Typography gutterBottom variant="h4">
          Follows
      </Typography>
      <Table sx={{minWidth: 300}} size="small" aria-label="a dense table">
        {/* map multiple FollowListItem components here based on follows database table */}
        <FollowListItem initials="RM" name="Ryan MacEachern" />
        <FollowListItem initials="RW" name="Ryan Williams"/>
        <FollowListItem initials="HM" name="Hannah Montana"/>
      </Table>
      </CardContent>
    </Card>
  );
}

export default FollowList;
