import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');
// Cold starts on a loaded machine can take longer than the 30s default to get
// the four brand faces decoded before the first frame is painted.
Config.setDelayRenderTimeoutInMilliseconds(120000);
