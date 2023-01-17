import { camelCase, isArray, transform, isObject } from "lodash";
import { RevenueType, StudyType, StudiesDisplayType } from "../types/analytics";

export const convetToCamelCaseObject = (
  obj: Record<string, unknown>
): Record<string, unknown> =>
  transform(
    obj,
    (
      result: Record<string, unknown>,
      value: unknown,
      key: string,
      target: unknown
    ) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? convetToCamelCaseObject(value as Record<string, unknown>)
        : value;
    }
  );

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const asRevenueDisplayData = (data: StudyType[]) => {
  return data.map((item: StudyType, key: number) => {
    const revenueNode: RevenueType = {
      name: item.date,
      revenue: item.revenue,
    };
    return revenueNode;
  });
};

export const asModalityDisplayData = (data: StudyType[], modality: string) => {
  const groupedByModality = groupBy(data, (i) => i.modality);
  const studiesData: StudiesDisplayType[] = [];
  if (modality === "all") {
    Object.keys(groupedByModality).forEach((key) => {
      const studyNode = {
        name: key,
        count: groupedByModality[key].length,
      };
      studiesData.push(studyNode);
    });
  } else {
    const studyNode = {
      name: modality as string,
      count: groupedByModality[modality as string].length,
    };
    studiesData.push(studyNode);
  }
  return { studiesData };
};

export const asBodyPartDisplayData = (data: StudyType[], bodyPart: string) => {
  const groupedByBodyPart = groupBy(data, (i) => i.bodyPart);
  const bodyPartData: StudiesDisplayType[] = [];
  if (bodyPart === "all") {
    Object.keys(groupedByBodyPart).forEach((key) => {
      const bodyPartNode = {
        name: key,
        count: groupedByBodyPart[key].length,
      };
      bodyPartData.push(bodyPartNode);
    });
  } else {
    const bodyPartNode = {
      name: bodyPart,
      count: groupedByBodyPart[bodyPart as string].length,
    };
    bodyPartData.push(bodyPartNode);
  }
  return { bodyPartData };
};

export const asSlaDisplayData = (data: StudyType[]) => {
  return data.map(item => {
    const slaNode = {
      date: item.date,
      value: item.sla ? item.sla : 0
    }
    return slaNode;
  })
}

export const modalities = [
  "CR",
  "CT",
  "DX",
  "ECG",
  "MG",
  "MR",
  "NM",
  "PET",
  "RF",
  "SC",
  "US",
  "XA",
];

export const bodyParts = [
  "ABDOMEN",
  "ANKLE",
  "ARM",
  "BACK",
  "BREAST",
  "CHEST",
  "FOOT",
  "HAND",
  "HEAD",
  "HIP",
  "KNEE",
  "LEG",
  "NECK",
  "SHOULDER",
  "SPINE",
  "UTERUS",
  "WHOLEBODY",
  "WRIST",
];
