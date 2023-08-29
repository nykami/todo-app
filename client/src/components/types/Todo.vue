<script setup lang="ts">
export interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: string;
  date: string;
  isChecked: boolean;
  isEditing: boolean;
}
</script>
