import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { GradeRange } from '@/pages/projects/types/projectTypes';
import { routeGradeSelectItems } from '@/pages/projects/utils/projectValues';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useCustomRouteRanges } from '../hooks/useCustomRouteRanges';
import { RoutineInterval } from '../hooks/useRoutineIntervalTimer';
import { RoutineRouteSlidersForm } from './RoutineRouteSlidersForm';

export const RoutineRangePanel = ({
  routineInterval,
}: {
  routineInterval: RoutineInterval;
}) => {
  const {
    focusWorkoutDetails,
    customRoutineRouteGrades,
    setCustomRoutineRouteGrades,
  } = useCurrentActiveWorkout();
  const { bottomRange, topRange } = focusWorkoutDetails;

  const [bottomGradeRangeValue, setBottomGradeRangeValue] =
    useState<GradeRange>(bottomRange);
  const [topGradeRangeValue, setTopGradeRangeValue] =
    useState<GradeRange>(topRange);
  const [accordionIsExpanded, setAccordionIsExpanded] =
    useState<boolean>(false);

  const handleAccordionChange = () => {
    setAccordionIsExpanded(!accordionIsExpanded);
  };
  const gradeRangeSelectsAreDisabled = useMemo(() => {
    return Boolean(customRoutineRouteGrades);
  }, [customRoutineRouteGrades]);

  const { initialValues } = useCustomRouteRanges({
    bottomRange: bottomGradeRangeValue,
    topRange: topGradeRangeValue,
  });

  const resetCustomGradeRanges = useCallback(() => {
    setCustomRoutineRouteGrades(undefined);
  }, [setCustomRoutineRouteGrades]);

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
          disabled={gradeRangeSelectsAreDisabled}
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
          disabled={gradeRangeSelectsAreDisabled}
        >
          {routeGradeSelectItems}
        </Select>
      </FormControl>
      {customRoutineRouteGrades && (
        <Button
          variant="contained"
          color="secondary"
          onClick={resetCustomGradeRanges}
        >
          Reset Custom Route Ranges
        </Button>
      )}

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
              justifyContent: 'center',
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
          <RoutineRouteSlidersForm
            initialValues={customRoutineRouteGrades ?? initialValues}
            routineInterval={routineInterval}
          />
        </AccordionDetails>
      </Accordion>
    </CardContentContainer>
  );
};
