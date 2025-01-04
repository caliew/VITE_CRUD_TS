import { NHGLogo, NUHSLogo, SHSLogo } from '@shared/assets';
import { Cluster } from '@shared/constants/constants';

export const getClusterImageSrc = (clusterCode: string) => {
  switch (clusterCode) {
    case Cluster.NUHS:
      return NUHSLogo;
    case Cluster.NHG:
      return NHGLogo;
    case Cluster.SHS:
      return SHSLogo;
    default:
      return '';
  }
};
