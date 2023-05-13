import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { GradeRange } from '@/pages/projects/types/projectTypes';
import { routeGradeSelectItems } from '@/pages/projects/utils/projectValues';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { calculateLinearRouteRanges } from '../utils/calculateLinearRouteRanges';
import { RoutineRouteSlidersForm } from './RoutineRouteSlidersForm';

export const LinearNumberRoutineRangePanel = ({
  bottomRange,
  topRange,
  numberOfRoutes,
}: {
  bottomRange: GradeRange;
  topRange: GradeRange;
  numberOfRoutes: number;
}) => {
  const [bottomGradeRangeValue, setBottomGradeRangeValue] =
    useState<GradeRange>(bottomRange);
  const [topGradeRangeValue, setTopGradeRangeValue] =
    useState<GradeRange>(topRange);
  const [accordionIsExpanded, setAccordionIsExpanded] =
    useState<boolean>(false);
  const handleAccordionChange = () => {
    setAccordionIsExpanded(!accordionIsExpanded);
  };

  const customDifficultyRanges = useMemo(() => {
    return calculateLinearRouteRanges({
      bottomRange: bottomGradeRangeValue,
      topRange: topGradeRangeValue,
      numberOfRoutes,
    });
  }, [bottomGradeRangeValue, numberOfRoutes, topGradeRangeValue]);

  const initialValues = useMemo(() => {
    let obj = {};
    customDifficultyRanges.forEach((val, idx) => {
      const objKey = `Route ${idx + 1}`;
      obj = { ...obj, [objKey]: val };
    });
    return obj;
  }, [customDifficultyRanges]);

  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h3" fontWeight="bold">
        Difficulty Ranges
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Lower Difficulty Range</InputLabel>
        <Select
          fullWidth
          value={bottomGradeRangeValue}
          onChange={(e) =>
            setBottomGradeRangeValue(e.target.value as GradeRange)
          }
          label="Lower Difficulty Range"
        >
          {routeGradeSelectItems}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Upper Difficulty Range</InputLabel>
        <Select
          fullWidth
          value={topGradeRangeValue}
          onChange={(e) => setTopGradeRangeValue(e.target.value as GradeRange)}
          label="Upper Difficulty Range"
        >
          {routeGradeSelectItems}
        </Select>
      </FormControl>

      <Accordion
        expanded={accordionIsExpanded}
        onChange={handleAccordionChange}
        elevation={0}
        sx={{
          width: '100%',
        }}
      >
        <AccordionSummary
          sx={{
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'center !important',
            },
          }}
        >
          <Stack alignItems="center">
            <Typography>Update Routes</Typography>
            <ExpandMoreIcon
              sx={{
                ...(accordionIsExpanded && { transform: 'rotate(180deg)' }),
              }}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <RoutineRouteSlidersForm initialValues={initialValues} />
        </AccordionDetails>
      </Accordion>
    </CardContentContainer>
  );
};
